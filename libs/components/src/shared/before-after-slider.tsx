import { ChangeEvent, useState } from 'react';

interface Props {
  beforeImage: string;
  afterImage: string;
  width: number;
  height: number;
}

export function BeforeAfterSlider(props: Props) {
  const { beforeImage, afterImage, width, height } = props;
  const [range, setRange] = useState(50);
  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(parseInt(e.target.value));
  };

  return (
    <div
      className="before-after-container"
      style={{
        width,
        height: `${height}px`,
      }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `.before-after-slider::-webkit-slider-thumb {
             height: ${height}px;
             }
             .before-after-slider::-moz-range-thumb {
             height: ${height}px;
             }`,
        }}></style>
      <div className="my-special-div"></div>
      <div
        className="before-after-img before-after-background-img"
        style={{
          backgroundImage: `url(/images/${afterImage}.jpg)`,
          backgroundSize: `${width}px auto`,
        }}>
        <p className="before-after-title-container">After</p>
      </div>
      <div
        className="before-after-img before-after-foreground-img"
        style={{
          width: `calc(${range}% - 6px)`,
          backgroundImage: `url(/images/${beforeImage}.jpg)`,
          backgroundSize: `${width}px auto`,
        }}>
        <p className="before-after-title-container">Before</p>
      </div>
      <input
        type="range"
        min="1"
        max="100"
        value={range}
        className="before-after-slider"
        name="slider"
        id="before-after-slider"
        onChange={handleRangeChange}
      />
      <div
        className="before-after-slider-button"
        style={{
          left: `calc(${range}% - 18px)`,
        }}></div>
    </div>
  );
}
