import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Photo from "../../../assets/Home/talk.png";
const image = [Photo,
     Photo,
     Photo,
     Photo,
     Photo,
     Photo];

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
      className="overflow-hidden flex items-center justify-center"
      ref={emblaRef}
    >
      <div className="flex">
        {image.map((image, index) => (
          <div
            className="flex-[0_0_22%] font-inter mr-[32px] rounded-3xl bg-white"
            key={index}
          >
            <img src={image} alt="" className="rounded-[10px] size-[270px] object-cover"/>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
