export const getSortWeight = (name: string) => {
  const n = name.toLowerCase();
  // Volume 1
  if (!n.includes('vol2')) {
    if (n.includes('foreword')) return 0;
    if (n.includes('master_outline')) return 1;
    if (n.includes('ch')) {
      const m = n.match(/ch(\d+)/);
      return 100 + (m ? parseInt(m[1]) : 0);
    }
    if (n.includes('appendix')) {
      const m = n.match(/appendix_a(\d+)/);
      return 200 + (m ? parseInt(m[1]) : 0);
    }
    return 299;
  }
  // Volume 2
  if (n.includes('foreword')) return 300;
  if (n.includes('master_outline')) return 301;
  if (n.includes('ch')) {
    const m = n.match(/ch(\d+)/);
    return 400 + (m ? parseInt(m[1]) : 0);
  }
  if (n.includes('appendix')) {
    const m = n.match(/appendix_a(\d+)/);
    return 500 + (m ? parseInt(m[1]) : 0);
  }
  return 600;
};
