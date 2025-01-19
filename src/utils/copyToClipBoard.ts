const copyToClipboard = (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  // navigator.clipboard 지원안할때
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-999999px';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    textarea.remove();
    return Promise.resolve();
  } catch (err) {
    console.error('링크 복사 실패:', err);
    textarea.remove();
    return Promise.reject(err);
  }
};

export default copyToClipboard;
