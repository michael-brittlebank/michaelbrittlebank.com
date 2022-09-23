import { BeforeAfterSlider } from '../shared/before-after-slider';
import { Ref, useCallback, useEffect, useRef, useState } from 'react';

export function Renovation() {
  const containerReference: Ref<HTMLDivElement> = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(200);

  const handleResize = useCallback(() => {
    const calculatedWidth = containerReference.current?.offsetWidth || 0;
    setWidth(calculatedWidth);
    setHeight(calculatedWidth * 0.75);
  }, [containerReference]);

  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerReference, handleResize]);

  return (
    <section
      id="renovation-container"
      className="col-sm-12"
      ref={containerReference}>
      <h2 className="section-header">Home Renovation</h2>
      <p className="section-description">
        I like working with my hands, especially on projects where I am able to
        build something. I spent three years rebuilding and renovating my first
        house including all new wiring, plumbing, insulation, siding, drywall,
        front walk, driveway, and landscaping. This resulted in every room in
        the house changing to some degree which I really enjoyed from the
        architecture and layout perspective. I am eagerly looking forward to
        more house projects to keep me busy.
      </p>
      <BeforeAfterSlider
        beforeImage="front-before"
        afterImage="front-after"
        width={width}
        height={height}
      />
      <BeforeAfterSlider
        beforeImage="side-before"
        afterImage="side-after"
        width={width}
        height={height}
      />
    </section>
  );
}
