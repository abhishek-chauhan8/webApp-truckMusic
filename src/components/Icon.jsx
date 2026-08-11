const Icon = ({ name, size = 18 }) => {

  const icons = {
    play: <path d="m8 5 11 7-11 7V5Z" fill="currentColor" />,
    pause: <path d="M8 6v12M16 6v12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,

    previous: (
      <>
        <path d="m18 6-9 6 9 6V6Z" fill="currentColor" />
        <path d="M6 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),

    next: (
      <>
        <path d="m6 6 9 6-9 6V6Z" fill="currentColor" />
        <path d="M18 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),

    shuffle: (
      <>
        <path d="M4 7h2c5 0 7 10 12 10h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m18 14 3 3-3 3M4 17h2c1.8 0 3-1.2 4.1-2.9M14 9.9C15 8.2 16.2 7 18 7h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m18 4 3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),

    list: (
      <>
        <path d="M8 7h12M8 12h12M8 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 7h.01M4 12h.01M4 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </>
    ),

    volume: (
      <>
        <path d="M4 10v4h4l5 4V6L8 10H4Z" fill="currentColor" />
        <path d="M16 9.5a4 4 0 0 1 0 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),

    compass: (
      <>
        <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m14.8 9.2-1.8 4-3.8 1.7 1.8-4 3.8-1.7Z" fill="currentColor" />
      </>
    ),

    close: (
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    )
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};

export default Icon;