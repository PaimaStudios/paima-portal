const FilterIcon = () => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M2.82159 4.72239C2.1913 4.01796 1.87616 3.66574 1.86427 3.3664C1.85395 3.10636 1.96569 2.85643 2.16637 2.69074C2.39738 2.5 2.87 2.5 3.81524 2.5H16.1844C17.1296 2.5 17.6022 2.5 17.8332 2.69074C18.0339 2.85643 18.1456 3.10636 18.1353 3.3664C18.1234 3.66574 17.8083 4.01796 17.178 4.72239L12.4228 10.037C12.2972 10.1774 12.2343 10.2477 12.1896 10.3276C12.1498 10.3984 12.1207 10.4747 12.103 10.554C12.0831 10.6435 12.0831 10.7377 12.0831 10.9261V15.382C12.0831 15.5449 12.0831 15.6264 12.0568 15.6969C12.0336 15.7591 11.9958 15.8149 11.9467 15.8596C11.891 15.9102 11.8154 15.9404 11.6641 16.001L8.83073 17.1343C8.52444 17.2568 8.3713 17.3181 8.24836 17.2925C8.14085 17.2702 8.04651 17.2063 7.98584 17.1148C7.91646 17.0101 7.91646 16.8452 7.91646 16.5153V10.9261C7.91646 10.7377 7.91646 10.6435 7.89657 10.554C7.87892 10.4747 7.84977 10.3984 7.81004 10.3276C7.76525 10.2477 7.70243 10.1774 7.57679 10.037L2.82159 4.72239Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SingleArrowDownIcon = () => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M8.00016 3.3335V12.6668M8.00016 12.6668L12.6668 8.00016M8.00016 12.6668L3.3335 8.00016"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const DoubleArrowDownIcon = () => {
  return (
    <svg
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M4.66669 9.56071L8.00002 12.894L11.3334 9.56071M4.66669 4.89404L8.00002 8.22738L11.3334 4.89404"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SingleArrowRightIcon = () => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M4.16663 9.99984H15.8333M15.8333 9.99984L9.99996 4.1665M15.8333 9.99984L9.99996 15.8332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SingleArrowLeftIcon = () => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M15.8333 9.99984H4.16663M4.16663 9.99984L9.99996 15.8332M4.16663 9.99984L9.99996 4.1665"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CheckmarkIcon = () => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M13.3334 4L6.00008 11.3333L2.66675 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M9 3L3 9M3 3L9 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MobileMenuIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M3 12H21M3 6H21M3 18H21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MobileMenuCloseIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export {
  FilterIcon,
  SingleArrowDownIcon,
  CheckmarkIcon,
  CloseIcon,
  SingleArrowRightIcon,
  SingleArrowLeftIcon,
  DoubleArrowDownIcon,
  MobileMenuIcon,
  MobileMenuCloseIcon,
};
