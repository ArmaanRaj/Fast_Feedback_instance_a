'use client'

import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('../personal_area');
  }

  return (
    <main className="bg-[#151719]">
      <Navbar />
      <h1 className="text-center text-white font-extrabold text-5xl p-5 mt-6">
        <span>Collect valuable </span>  <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">feedbacks</span> <span>using</span>
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent"> Fast Feedback</span>
      </h1>
      <div className="flex flex-row justify-center m-7">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/8jRfaM2l1iw?si=pKI8mhaKNHqkz4ei" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="scale-110 border-2 border-[#EBF400] rounded-lg p-4"></iframe>
      </div>
      <h1 className="text-center text-white font-extrabold text-5xl p-5 mt-11">
        <span className="">Embed </span>
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">feedbacks </span>
        <span>in your website with low code approach</span>
      </h1>
      <div className="flex flex-row justify-center mt-3">
        <h1 className="text-center font-bold text-xl max-w-[700px]"><span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">Fast Feedback </span><span className="text-white">enables you to add your favoutite feedbacks in your website just by a copy and paste.</span></h1>
      </div>
      <h1 className="text-center text-white font-extrabold text-5xl p-5 mt-7">
        <span className="">Let&apos;s get you started </span>
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">!</span>
      </h1>
      <h1 className="text-2xl font-extrabold text-center">
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">Step 1 : </span>
        <span className="text-white">Create your Fast Feedback Area</span>
      </h1>
      <img src="./landing_page/step1.jpg" className="border-2 border-[#EBF400]  scale-75 rounded-lg" />
      <h1 className="text-2xl font-extrabold text-center">
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">Step 2 : </span>
        <span className="text-white">Use the generated link to collect feedbacks</span>
      </h1>
      <img src="./landing_page/step2.jpg" className="border-2 border-[#EBF400]  scale-75 rounded-lg" />
      <h1 className="text-2xl font-extrabold text-center">
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">Step 3 : </span>
        <span className="text-white">See all feedbacks and choose which to embed</span>
      </h1>
      <img src="./landing_page/step3a.jpg" className="border-2 border-[#EBF400]  scale-75 rounded-lg" />
      <h1 className="text-2xl font-extrabold text-center">
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">Step 4 : </span>
        <span className="text-white">Copy the code snippet and paste in your website&apos;s code</span>
      </h1>
      <img src="./landing_page/step3.jpg" className="border-2 border-[#EBF400]  scale-75 rounded-lg" />
      <h1 className="text-2xl font-extrabold text-center">
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">Step 5 : </span>
        <span className="text-white">See embedded feedbacks like these ones below (Yep! these are embedded): </span>
      </h1>
      <div className="flex flex-row justify-center items-center p-2">
        <div className="m-7 w-full h-[300px] md:w-[500px] md:h-[300px] lg:w-[700px] lg:h-[400px]"> {/* Adjust sizes */}
          <div className="relative w-full h-full overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://fast-feedback-instance-c.vercel.app/?name=Fast+Feedback&color=e87700&bgColor=000000&textColor=FFFFFF"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className=""></div>
      <div className="flex flex-col items-center gap-8">
        <span className="text-center text-white font-extrabold text-5xl">Now see for yourself</span>
        <div className="h-[60px] w-[140px] scale-125 text-black bg-gradient-to-r from-[#EBF400] to-[#FFAF00] mx-5 rounded-xl flex flex-row items-center justify-center transition transform hover:scale-150 duration-300 mb-7 cursor-pointer" onClick={handleClick}><span className='font-extrabold ml-7'>Enter Fast Feedback</span></div>
      </div>
      <Footer />
    </main>
  );
}
