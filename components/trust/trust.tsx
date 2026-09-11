import Image from "next/image";
import "./trust.css";

type TrustItem = {
  name: string;
  logo: string;
};

type TrustProps = {
  items?: TrustItem[];
};

const defaultItems: TrustItem[] = [
  {
    name: "Aditya Birla Capital",
    logo: "/images/client/Aditya-Birla.webp",
  },
  {
    name: "Apar",
    logo: "/images/client/Apar.webp",
  },
  {
    name: "Axis Bank",
    logo: "/images/client/axis-bank.webp",
  },
  {
    name: "Bandhan Bank",
    logo: "/images/client/Bandhan-Bank.webp",
  },
  {
    name: "Bank of India",
    logo: "/images/client/bank-of-india.webp",
  },
  {
    name: "Entuity",
    logo: "/images/client/Enquity.webp",
  },
  {
    name: "Future Generali",
    logo: "/images/client/future.webp",
  },
  {
    name: "ICICI Bank",
    logo: "/images/client/Icici-bank.webp",
  },
  {
    name: "ICICI Lombard",
    logo: "/images/client/Icici-Lombard.webp",
  },
  {
    name: "ICICI Prudential",
    logo: "/images/client/Icici-P.webp",
  },
  {
    name: "Indian Overseas Bank",
    logo: "/images/client/indian-overseas-bank.webp",
  },
  {
    name: "J&K Bank",
    logo: "/images/client/JK-Bank.webp",
  },
  {
    name: "Magnoos",
    logo: "/images/client/magnoos.webp",
  },
  {
    name: "Mphasis",
    logo: "/images/client/mphisis.png",
  },
  {
    name: "Persistent",
    logo: "/images/client/Persistant.webp",
  },
  {
    name: "SBI Life",
    logo: "/images/client/Sbi-Life.webp",
  },
  {
    name: "State Bank of India",
    logo: "/images/client/SBI.webp",
  },
  {
    name: "UCO Bank",
    logo: "/images/client/uco-bank.webp",
  },
  {
    name: "Union Bank of India",
    logo: "/images/client/union-bank.webp",
  },
  {
    name: "Volkswagen",
    logo: "/images/client/volkswagaon.webp",
  },
];

export default function Trust({
  items = defaultItems,
}: TrustProps) {
  /*
   * Duplicate the complete logo list.
   * This creates a seamless infinite slider.
   */
  const sliderItems = [...items, ...items];

  return (
    <section
      className="trust"
      aria-label="Trusted By"
    >
      {/* =========================================
          TRUSTED BY LABEL
          ========================================= */}

      <div className="trust__label">
        <span>Trusted</span>
        <span>By</span>
      </div>


      {/* =========================================
          LOGO VIEWPORT
          ========================================= */}

      <div className="trust__logos">

        {/* =======================================
            ANIMATED TRACK
            ======================================= */}

        <div className="trust__track">

          {sliderItems.map((item, index) => (
            <div
              className="trust__item"
              key={`${item.name}-${index}`}
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={180}
                height={64}
                className="trust__image"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}