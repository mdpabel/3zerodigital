import { YouTubeEmbed } from '@next/third-parties/google';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

const HeroSection = ({
  title,
  subtitle,
  description,
  youtubeId,
  firstBtnText,
  imgSrc,
  firstBtnLink,
}: {
  title: string;
  subtitle: string;
  description: string;
  youtubeId?: string;
  firstBtnText: string;
  firstBtnLink: string;
  imgSrc?: StaticImageData;
}) => {
  return (
    <div className='relative py-10 md:py-14'>
      <div className='gap-8 grid grid-cols-1 md:grid-cols-5'>
        <div className='flex flex-col justify-center col-span-3'>
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 `}>{title}</h1>
          <p className={`text-xl md:text-2xl mb-8  `}>{subtitle}</p>
          <p className={`text-md md:text-lg mb-10  `}>{description}</p>
          <div className='flex md:flex-row flex-col gap-8 md:gap-6'>
            <div>
              <Link
                href={firstBtnLink}
                className={`px-4 py-2.5 bg-gradient-to-r from-[#614385] to-[#516395] text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105`}>
                {firstBtnText}
              </Link>
            </div>
            <div>
              <Link
                href=''
                className={`px-4 py-2.5 bg-gradient-to-r from-[#614385] to-[#516395] text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105`}>
                Book a call
              </Link>
            </div>
          </div>
        </div>

        <div className='relative flex justify-center items-center col-span-2'>
          {youtubeId && (
            <YouTubeEmbed videoid={youtubeId} width={400} params='controls=0' />
          )}
          {imgSrc && <Image src={imgSrc} alt={title} />}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
