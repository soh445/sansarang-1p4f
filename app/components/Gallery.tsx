"use client";

import { useMemo, useState } from "react";

type GalleryProps = {
  images: string[];
  visibleCount?: number;
  open: boolean;
  onClose: () => void;
};

export default function Gallery({
  images,
  visibleCount = 5,
  open,
  onClose,
}: GalleryProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(Math.ceil(images.length / visibleCount), 1);

  const currentImages = useMemo(
    () => images.slice(page * visibleCount, page * visibleCount + visibleCount),
    [images, page, visibleCount]
  );

  const goPrev = () => setPage((current) => Math.max(current - 1, 0));
  const goNext = () => setPage((current) => Math.min(current + 1, totalPages - 1));
  const goPage = (index: number) => setPage(() => Math.max(0, Math.min(totalPages - 1, index)));

  return (
    <div className={`gallery-view ${open ? "gallery-view--open" : ""}`} aria-hidden={!open}>
      <div className="gallery-view__panel">
        <div className="gallery-view__header">
          <div>
            <p className="gallery-view__eyebrow">사진 갤러리</p>
            <h2 className="gallery-view__title">자연 공간 사진을 확인해보세요</h2>
          </div>
          <button className="gallery-view__close" type="button" onClick={onClose}>
            닫기
          </button>
        </div>
        <p className="gallery-view__summary">총 {images.length}장, 페이지당 {visibleCount}장</p>
        <div className="gallery-view__grid">
          {currentImages.map((src, index) => (
            <div key={`${src}-${index}`} className="gallery-view__item">
              <img src={src} alt={`갤러리 사진 ${page * visibleCount + index + 1}`} />
            </div>
          ))}
        </div>
        <div className="gallery-view__pager">
          <button
            className="gallery-view__pager-button"
            type="button"
            onClick={goPrev}
            disabled={page === 0}
          >
            이전
          </button>
          <div className="gallery-view__dots">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                className={`gallery-view__dot ${index === page ? "gallery-view__dot--active" : ""}`}
                onClick={() => goPage(index)}
                aria-label={`페이지 ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="gallery-view__pager-button"
            type="button"
            onClick={goNext}
            disabled={page === totalPages - 1}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
