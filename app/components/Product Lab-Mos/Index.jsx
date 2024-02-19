import {AiOutlineDown} from 'react-icons/ai';
import {tags} from '~/constant/sizes';
import {useNavigate} from '@remix-run/react';
import { useState } from 'react';



export const LabMos = ({url, tags}) => {

  //console.log(tags)

  const isMoissanite = tags?.includes('Mos_to_Lab');
  const isLabDiamond = tags?.includes('Lab_to_Mos');
  const navigate = useNavigate();


  const [value, setValue] = useState("")


  //console.log(`/products/${url.replace("moissanite","lab-grown-diamond")}`)

  const handleChange = (e)=> {
    navigate(e.target.value)
    setValue(e.target.value)
    
  }


  if ( isLabDiamond || isMoissanite) {

    return (
      <div
        id="typeExtraInputs"
        className="relative w-full text-[#595959] tracking-wide mt-[10px] mb-[15px]"
      >
        <select value={value} onChange={handleChange} className="align-middle leading-[19.5px] w-full h-[41.5px] cursor-pointer bg-transparent px-[15px] py-[10px] focus:border-transparent text-[13px] focus:outline-none border border-[#E5E7EB] z-10">
          {isMoissanite ? (
            <>
              <option value={`/products/${url}`}>Moissanite</option>
              <option value={`/products/${url.replace("moissanite","lab-grown-diamond")}`} >Lab Grown Diamond</option>
            </>
          ) : isLabDiamond ? (
            <>
              <option value={`/products/${url}`}>Lab Grown Diamond</option>
              <option value={`/products/${url.replace("lab-grown-diamond","moissanite")}`} >Moissanite</option>
            </>
          ) : undefined}
        </select>
  
        <AiOutlineDown className="absolute right-[15px] top-[14px] text-sm text-[#000] z-[-1]" />
      </div>
    );


  } else undefined;


};
