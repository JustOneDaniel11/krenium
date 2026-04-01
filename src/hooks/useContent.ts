import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useContent = (section?: string) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let query = supabase.from('content').select('*');
        if (section) {
          query = query.eq('section', section);
        }
        
        const { data, error } = await query;
        if (error) throw error;

        const contentData: Record<string, any> = {};
        data?.forEach(item => {
          if (item.key) {
            contentData[item.key] = item;
          }
        });
        console.log(`useContent fetched for section ${section}:`, contentData);
        setContent(contentData);
      } catch (error) {
        console.error("Content Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    // Real-time subscription with unique channel name to avoid collisions
    const channelName = `content_changes_${Math.random().toString(36).substring(2, 9)}`;
    const subscription = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, () => {
        fetchContent();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [section]);

  return { content, loading };
};

export const useSlider = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const { data, error } = await supabase
          .from('slider_images')
          .select('*')
          .eq('active', true)
          .order('order', { ascending: true });
        
        if (error) throw error;
        setImages(data || []);
      } catch (error) {
        console.error("Slider Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlider();

    // Real-time subscription with unique channel name to avoid collisions
    const channelName = `slider_changes_${Math.random().toString(36).substring(2, 9)}`;
    const subscription = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'slider_images' }, () => {
        fetchSlider();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { images, loading };
};
