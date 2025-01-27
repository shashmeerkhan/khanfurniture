import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner2 from "@/components/Banner2";
import Support from "@/components/Support";
import FourProduct from "@/components/fourProducts";
import Protional from "@/components/Protional";
import FeaturedProduct from "@/components/FeaturedProduct";
import TrendingProduct from "@/components/TrendingProduct";


export default function Home() {
  return (
 <>
 <Header/>
 <Protional/>
 <FourProduct/>
<FeaturedProduct/>
<TrendingProduct/>
 <Banner2/>

 <Banner/>

<Support/>
 <Footer/>
 
 </>
  );
}
