
import React from 'react';
interface DoubleCheckIconProps extends React.SVGProps<SVGSVGElement> {
  read?: boolean;
}
export const DoubleCheckIcon: React.FC<DoubleCheckIconProps> = ({ read, ...props }) => (
    <svg viewBox="0 0 18 18" width="18" height="18" fill="none" {...props} className={read ? 'text-blue-400' : 'text-gray-400'}>
        <path d="M2.15,9.2,5.2,12.2a.5.5,0,0,0,.7,0l7.8-7.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M7.15,9.2l3-3,2.7,2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"></path>
    </svg>
);
