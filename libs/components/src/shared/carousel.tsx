import { CarouselSlide } from '@michaelbrittlebank/types';
import { useState } from 'react';

interface Props {
  slides: CarouselSlide[];
}

export default function Carousel(props: Props) {
  const { slides } = props;
  const [currentCarousel, setCurrentCarousel] = useState(0);

  const scrollCarousel = (increment: number) => {
    let modifiedCurrentCarousel = currentCarousel + increment;
    if (modifiedCurrentCarousel === slides.length) {
      // forwards from last to first
      modifiedCurrentCarousel = 0;
    } else if (modifiedCurrentCarousel < 0) {
      // backwards from first to last
      modifiedCurrentCarousel = slides.length - 1;
    }
    setCurrentCarousel(modifiedCurrentCarousel);
  };
  return (
    <section className="carousel-wrapper">
      <div className="carousel-container">
        {slides.map((slide) => (
          <a
            href={slide.url}
            target="_blank"
            rel="noreferrer"
            key={slide.title}
            className="slide"
            style={{
              transform: `translate(-${currentCarousel * 100}%)`,
              backgroundImage: `url(/images/${slide.image})`,
            }}>
            <p className="carousel-slide-title">{slide.title}</p>
          </a>
        ))}
      </div>
      <button
        type="button"
        className="carousel-arrow carousel-arrow-prev"
        onClick={() => scrollCarousel(-1)}>
        &#8249;
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-arrow-next"
        onClick={() => scrollCarousel(1)}>
        &#8250;
      </button>
    </section>
  );
}
