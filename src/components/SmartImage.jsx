import { useState } from "react";

export function SmartImage({
  alt,
  className = "",
  eager = false,
  sizes,
  sourceSet,
  src,
  ...imageProps
}) {
  const [status, setStatus] = useState("loading");

  const image = (
    <img
      {...imageProps}
      alt={alt}
      className={className}
      data-state={status}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      loading={eager ? "eager" : "lazy"}
      onError={() => setStatus("error")}
      onLoad={() => setStatus("ready")}
      sizes={sizes}
      src={src}
    />
  );

  return (
    <span className="smart-image" data-state={status}>
      {sourceSet ? (
        <picture>
          {sourceSet.map((source) => (
            <source
              key={`${source.type}-${source.media || "all"}`}
              media={source.media}
              srcSet={source.srcSet}
              type={source.type}
            />
          ))}
          {image}
        </picture>
      ) : (
        image
      )}
      {status === "loading" ? <span className="image-loading" aria-hidden="true" /> : null}
      {status === "error" ? (
        <span className="image-error" role="status">
          图片暂时未能加载
        </span>
      ) : null}
    </span>
  );
}
