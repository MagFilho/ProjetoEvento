import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/painel">
      <a>
        <img width={"100%"} height={"100%"} src={"/LogEst.jpg"} alt="logo" />
      </a>
    </Link>
  );
};

export default Logo;
