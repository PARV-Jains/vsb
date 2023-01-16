import React from 'react';
import { IoReturnUpBack } from 'react-icons/io5';
import Link from 'next/link';

function StudioNavBar(props: any) {
  // const { renderDefault, title } = props;
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="text-yellow-400 flex items-center">
          <IoReturnUpBack className="h-6 w-6 mr-2 text-yellow-400" />
          Go To Website
        </Link>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
}

export default StudioNavBar;
