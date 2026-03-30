import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export const useContent = (section?: string) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contentRef = collection(db, 'content');
    const q = section ? query(contentRef, where('section', '==', section)) : contentRef;

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Record<string, any> = {};
      snapshot.docs.forEach(doc => {
        const item = doc.data();
        if (item.key) {
          data[item.key] = item;
        }
      });
      setContent(data);
      setLoading(false);
    }, (error) => {
      console.error("Content Snapshot Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [section]);

  return { content, loading };
};

export const useSlider = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'slider_images'), where('active', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
      setImages(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
      setLoading(false);
    }, (error) => {
      console.error("Slider Snapshot Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { images, loading };
};
