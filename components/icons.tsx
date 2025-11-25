import React from 'react';

const IconBase = ({ children, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    {children}
  </svg>
);

// export const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
//     <IconBase {...props}>
//         <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//         <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//     </IconBase>
// );

export const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        <path d="M12 8h4"></path>
        <path d="M12 13h4"></path>
    </IconBase>
);

export const MessageCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </IconBase>
);

export const SproutIcon = () => (
  <img
    src="/icons/sprout.png"
    alt="Sprout Icon"
    className="w-8 h-8 mr-2"
    width={24}
    height={24}
  />
);

export const LookupIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <path d="M16 16l5 5" />
        <circle cx="10" cy="10" r="7" />
        <path d="M10 6v8" />
        <path d="M10 12c1.5 0 2.5-1 2.5-3" />
        <path d="M10 10c-1.5 0-2.5-1-2.5-3" />
    </IconBase>
);

export const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </IconBase>
);

export const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </IconBase>
);

export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <circle cx="12" cy="12" r="5"></circle>
        <path d="M12 1v2"></path>
        <path d="M12 21v2"></path>
        <path d="M4.22 4.22l1.42 1.42"></path>
        <path d="M18.36 18.36l1.42 1.42"></path>
        <path d="M1 12h2"></path>
        <path d="M21 12h2"></path>
        <path d="M4.22 19.78l1.42-1.42"></path>
        <path d="M18.36 5.64l1.42-1.42"></path>
    </IconBase>
);

export const WaterDropIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
        <path d="M13 16a2 2 0 0 0 1.5-2" strokeLinecap="round"></path>
    </IconBase>
);

export const SoilIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        {/* Mound */}
        <path d="M3 21c0-3.5 3-6 9-6s9 2.5 9 6" />
        {/* Plant */}
        <path d="M12 15v-7" />
        <path d="M12 8c0-2 2-3 3-3" />
        <path d="M12 11c-2 0-3-1-3-3" />
    </IconBase>
);

export const FertilizerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <rect x="6" y="8" width="12" height="13" rx="2" />
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M12 12v4" />
        <path d="M10 14h4" />
    </IconBase>
);

export const ToxicityIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <rect x="7" y="5" width="10" height="9" rx="4.5" />
        <path d="M9 14v2c0 1 1 1.5 1.5 1.5h3c.5 0 1.5-.5 1.5-1.5v-2" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="14" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </IconBase>
);

export const BugIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <circle cx="12" cy="13" r="7" />
        <path d="M12 20V6" />
        <path d="M12 6a4 4 0 0 0-4 3h8a4 4 0 0 0-4-3" />
        <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
        <circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" />
        <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
    </IconBase>
);

export const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </IconBase>
);