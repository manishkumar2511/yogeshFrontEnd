import Banner from '../component/Banner'
import Category from '../component/Category'
import FlashSale from '../component/FlashSale'
import BestSeller from '../component/BestSeller'
import Arrived from '../component/Arrived'

export default function Home() {
    return (
        <>
            <Banner />
            <Category />
            <FlashSale />
            <BestSeller />
            <Arrived />
        </>
    )
}
