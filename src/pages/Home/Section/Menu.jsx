import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Photo from "../../../assets/Home/talk.png";
const image = [Photo, Photo, Photo, Photo, Photo, Photo, Photo, Photo];

function Menu() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      playOnInit: true,
      direction: "forward",
      stopOnInteraction: false,
      startDelay: 10,
      speed: 1,
    }),
  ]);
  return (
    <div
      className="flex items-center justify-center overflow-hidden"
      data-aos-delay="50" data-aos="fade-up" data-aos-duration="2000"
      ref={emblaRef}
    >
      <div className="flex">
        {image.map((image, index) => (
          <div
            className="flex-[0_0_28%] sm:flex-[0_0_30%] md:flex-[0_0_26%] lg:flex-[0_0_22%] xl:flex-[0_0_19%] font-inter mr-[14px] sm:mr-[29.14px] xmd:mr-[34px] rounded-3xl bg-white"
            key={index}
          >
            <img
              src={image}
              alt=""
              className="rounded-[10px] size-[120px] sm:size-[242px] xmd:size-[270px] object-cover"
            />
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
