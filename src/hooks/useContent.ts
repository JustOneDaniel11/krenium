import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useContent = (section?: string) => {
  const cacheKey = `krenium_content_${section || 'all'}`;
  const [content, setContent] = useState<Record<string, any>>(() => {
    const cached = localStorage.getItem(cacheKey);
    return cached ? JSON.parse(cached) : {};
  });
  const [loading, setLoading] = useState(!localStorage.getItem(cacheKey));

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
        setContent(contentData);
        localStorage.setItem(cacheKey, JSON.stringify(contentData));
      } catch (error) {
        console.error("Content Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

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
  }, [section, cacheKey]);

  return { content, loading };
};

export const useSlider = () => {
  const cacheKey = 'krenium_slider';
  const [images, setImages] = useState<any[]>(() => {
    const cached = localStorage.getItem(cacheKey);
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(!localStorage.getItem(cacheKey));

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
        localStorage.setItem(cacheKey, JSON.stringify(data || []));
      } catch (error) {
        console.error("Slider Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlider();

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
