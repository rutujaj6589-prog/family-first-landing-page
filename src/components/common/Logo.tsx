interface LogoProps {
  light?: boolean;   // true for light text (on dark bg), false for dark text (on light bg)
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: { icon: 36, text: 'text-[15px]', sub: 'text-[9px]' }, md: { icon: 44, text: 'text-[18px]', sub: 'text-[10px]' }, lg: { icon: 56, text: 'text-[22px]', sub: 'text-[12px]' } };

const FamilyFirstLogo = ({ light = false, size = 'md' }: LogoProps) => {
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* SVG Icon — Shield with family silhouette */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="shieldGradLight" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shield shape */}
        <path
          d="M22 3L5 10V22C5 31.5 12.5 40.2 22 42.5C31.5 40.2 39 31.5 39 22V10L22 3Z"
          fill={light ? 'url(#shieldGradLight)' : 'url(#shieldGrad)'}
          stroke={light ? 'rgba(255,255,255,0.8)' : '#f59e0b'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Family silhouette — parent left */}
        <circle cx="15.5" cy="17" r="3" fill="white" opacity={light ? 0.9 : 1} />
        <path d="M10 29C10 24.5 12.5 22 15.5 22C18.5 22 21 24.5 21 29" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity={light ? 0.9 : 1} />

        {/* Parent right */}
        <circle cx="28.5" cy="17" r="3" fill="white" opacity={light ? 0.9 : 1} />
        <path d="M23 29C23 24.5 25.5 22 28.5 22C31.5 22 34 24.5 34 29" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity={light ? 0.9 : 1} />

        {/* Child — center, smaller */}
        <circle cx="22" cy="19.5" r="2.2" fill={light ? '#fbbf24' : '#fde68a'} />
        <path d="M18.5 29C18.5 25.8 20 24 22 24C24 24 25.5 25.8 25.5 29" stroke={light ? '#fbbf24' : '#fde68a'} strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Heart above child */}
        <path d="M22 13.5C22 13.5 20 11 18 12C16 13 16.5 15.5 18 16.5L22 19L26 16.5C27.5 15.5 28 13 26 12C24 11 22 13.5 22 13.5Z" fill="white" opacity="0.4" />
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <p className={`font-serif font-extrabold leading-tight tracking-tight ${s.text} ${light ? 'text-white' : 'text-slate-900'}`}>
          Family First
        </p>
        <p className={`font-semibold uppercase tracking-[0.25em] leading-none mt-0.5 ${s.sub} ${light ? 'text-amber-500' : 'text-amber-500'}`}>
          Insurance
        </p>
      </div>
    </div>
  );
};

export default FamilyFirstLogo;
