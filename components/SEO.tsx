import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  ogImage = 'https://cleverquit.com/og-image.jpg'
}) => {
  useEffect(() => {
    // Update title
    document.title = `${title} | CleverQuit`;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    // Update meta description
    updateMetaTag('description', description);
    updateMetaTag('title', title);
    
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);
    
    // Update canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
      
      // Update OG URL
      updateMetaTag('og:url', canonical, true);
      updateMetaTag('twitter:url', canonical, true);
    }
  }, [title, description, keywords, canonical, ogImage]);
  
  return null;
};

export default SEO;
