import Image from 'next/image';
import CopyCoupon from './copy-coupon';
import img from '@/../public/Flag_of_Palestine.svg.webp';

const PalestineCampaignPost = () => {
  return (
    <div className='shadow-sm mx-auto px-4 py-8 border border-black/10 rounded-xl max-w-2xl'>
      <Image src={img} alt='Flag_of_Palestine' />
      <h1 className='my-6 font-bold text-3xl'>🎉 15% OFF for Palestine 🇵🇸</h1>
      <p className='mb-4 text-base'>
        In solidarity with the people of Palestine, we're offering a special
        discount. Use the coupon code{' '}
        <span className='font-semibold'>FREEPALESTINE</span> to receive{' '}
        <strong>15% off</strong> on your next order.
      </p>
      <p className='mb-6 text-base'>
        We encourage you to donate the saved amount to support humanitarian aid
        in Palestine. It's our small way of standing for justice, peace, and
        compassion.
      </p>

      <CopyCoupon />
    </div>
  );
};

export default PalestineCampaignPost;
