"use client";

// Тонкая обёртка над <img> с graceful-fallback: при ошибке загрузки
// прячет элемент целиком, чтобы не было битой иконки.
export function Image({
  src,
  alt = "",
  className = "",
  onError,
  ...rest
}) {
  const handleError = (e) => {
    e.currentTarget.style.display = "none";
    onError?.(e);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
}
