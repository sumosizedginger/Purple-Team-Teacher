import { useLayoutEffect } from 'react';
import { useNexusContext } from '../context/NexusContext';

export const SEOManager = () => {
  const { currentNode, inRoom } = useNexusContext();

  useLayoutEffect(() => {
    // 1. DYNAMIC TITLE
    const baseTitle = 'GUMOI SECURITY BASTION // Purple Team Forensic Nexus';
    if (inRoom && currentNode.seo) {
      document.title = `${currentNode.seo.metaTitle} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }

    // 2. META DESCRIPTION
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentNode.seo?.metaDescription || 'Tactical dashboard for Purple Team forensics and AI red teaming.');
    }

    // 3. META KEYWORDS
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', (currentNode.seo?.keywords || ['GUMOI', 'Purple Team', 'AI Red Teaming']).join(', '));
    }

    // 4. STRUCTURED DATA (JSON-LD)
    const existingScript = document.getElementById('nexus-json-ld');
    if (existingScript) {
      existingScript.remove();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": currentNode.seo?.schemaType || "WebPage",
      "name": currentNode.name,
      "description": currentNode.seo?.metaDescription || currentNode.detail,
      "publisher": {
        "@type": "Organization",
        "name": "GUMOI Security Bastion",
        "logo": {
          "@type": "ImageObject",
          "url": "https://your-domain.com/logo.png" // Placeholder
        }
      },
      "author": {
        "@type": "Person",
        "name": "Purple Team Teacher"
      },
      "dateModified": new Date().toISOString()
    };

    const script = document.createElement('script');
    script.id = 'nexus-json-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

  }, [currentNode, inRoom]);

  return null; // Headless component
};
