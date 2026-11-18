interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const imgLoading = priority ? 'eager' : loading;
  const objectFitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain';
  const priorityProps = priority ? { fetchpriority: 'high' } : {};

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={imgLoading}
      decoding={priority ? 'sync' : 'async'}
      {...priorityProps}
      {...(sizes && { sizes })}
      className={`${objectFitClass} ${className}`}
    />
  );
}
