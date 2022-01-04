import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const ShowCard = ({ show }) => {
  const router = useRouter();

  const goToShowPage = () => {
    router.push(`/show/${show.id}`);
  };

  return (
    <Link href={`show/${show.id}`}>
      <a>
        <div>
          {show.image
            ? {
                /* <Image
              src={show.image}
              width={210}
              height={295}
              alt={`${show.title} poster`}
            /> */
              }
            : {
                /* <Image src={show.image} width={208} height={292} /> */
              }}
          <h5>{show.name}</h5>
          <div>
            <p>
              {show.rating.average || "?"} <span>/10</span>
            </p>
            <p>
              {show.premiered ? show.premiered.slice(0, 4) : "?"}-
              {show.ended && show.ended.slice(0, 4)}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ShowCard;
