"use client";

import { useState } from "react";

const DEFAULT_PRODUCTS = [
  { label: "Soda Feldspar", image: "/images/mactus/image12.png", formula: "Na₂O·Al₂O₃·6SiO₂" },
  { label: "Potash Feldspar", image: "/images/mactus/image14.png", formula: "K₂O·Al₂O₃·6SiO₂" },
  { label: "Talc", image: "/images/mactus/image15.png", formula: "Mg₃Si₄O₁₀(OH)₂" },
  { label: "Kaolin Clay", image: "/images/mactus/image16.png", formula: "Al₂Si₂O₅(OH)₄" },
  { label: "Quartz", image: "/images/mactus/image17.png", formula: "SiO₂" },
  { label: "Ball Clay", image: "/images/mactus/image18.png", formula: "Al₂O₃·2SiO₂·2H₂O" },
  { label: "Mica", image: "/images/mactus/image19.png", formula: "KAl₂(AlSi₃O₁₀)(OH)₂" },
];

export default function ProductStrip({ items = DEFAULT_PRODUCTS }) {
  const [active, setActive] = useState(0);

  return (
    <div className="strip">
      {items.map((item, i) => (
        <button
          key={item.label}
          type="button"
          className={`slide ${active === i ? " active" : ""}`}
          style={{
            backgroundImage: `url('${item.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          aria-expanded={active === i}
          onClick={() => setActive(active === i ? null : i)}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
