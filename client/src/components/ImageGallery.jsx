  import React from "react";
  import { motion } from "framer-motion";
  import cs1 from "../assets/cs_1.png";
  import cs2 from "../assets/cs_2.png";
  import cs3 from "../assets/cs_3.png";
  import cs4 from "../assets/cs_4.png";
  import cs5 from "../assets/cs_5.png";
  import cs6 from "../assets/cs_6.png";
  import cs7 from "../assets/cs_7.png";
  import cs8 from "../assets/sample_img_2.png";
  import cs9 from "../assets/cs_9.png";
  import cs10 from "../assets/cs_10.png";
  import { HoverExpand } from "./ui/HoverExpand";

  const ImageGallery = () => {
    const images = [cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8, cs9, cs10];

    return (
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center my-20"
      >
        <HoverExpand
          images={images}
          initialSelectedIndex={0}
          thumbnailHeight={200}
          modalImageSize={400}
          maxThumbnails={11}
        />
      </motion.div>
    );
  };

  export default ImageGallery;
