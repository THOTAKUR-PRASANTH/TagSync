import React from "react";

const SocialSignIn = () => {
  return (
    <div className="flex gap-12.5">
      {/* Google */}
      <button title="google" className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 hover:from-primary hover:to-secondary hover:bg-slateGray text-white cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_709_8846)">
            <path
              d="M22.5001 11.2438C22.5134 10.4876 22.4338 9.73256 22.2629 8.995H11.7246V13.0771H17.9105C17.7933 13.7929 17.5296 14.478 17.1352 15.0914C16.7409 15.7047 16.224 16.2335 15.6158 16.646L15.5942 16.7827L18.9264 19.3124L19.1571 19.335C21.2772 17.4161 22.4997 14.5926 22.4997 11.2438"
              fill="#4285F4"
            />
            <path
              d="M11.7245 22C14.755 22 17.2992 21.0221 19.1577 19.3355L15.6156 16.6464C14.6679 17.2944 13.3958 17.7467 11.7245 17.7467C10.3051 17.7385 8.92433 17.2926 7.77814 16.472C6.63195 15.6515 5.77851 14.4981 5.33892 13.1755L5.20737 13.1865L1.74255 15.8142L1.69727 15.9376C2.63043 17.7602 4.06252 19.2925 5.83341 20.3631C7.60429 21.4337 9.64416 22.0005 11.7249 22"
              fill="#34A853"
            />
            <path
              d="M5.33889 13.1755C5.09338 12.4753 4.96669 11.7404 4.96388 11C4.9684 10.2608 5.09041 9.52685 5.32552 8.8245L5.31927 8.67868L1.81196 6.00867L1.69724 6.06214C0.910039 7.5938 0.5 9.28491 0.5 10.9999C0.5 12.7148 0.910039 14.406 1.69724 15.9376L5.33889 13.1755Z"
              fill="#FBBC05"
            />
            <path
              d="M11.7249 4.25337C13.3333 4.22889 14.8888 4.8159 16.065 5.89121L19.2329 2.86003C17.2011 0.992106 14.5106 -0.0328008 11.7249 3.27798e-05C9.64418 -0.000452376 7.60433 0.566279 5.83345 1.63686C4.06256 2.70743 2.63046 4.23965 1.69727 6.06218L5.32684 8.82455C5.77077 7.50213 6.62703 6.34962 7.77491 5.5295C8.9228 4.70938 10.3044 4.26302 11.7249 4.25337Z"
              fill="#EB4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_709_8846">
              <rect
                width="22"
                height="22"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>

      {/* Facebook */}
      <button title="facebook" className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 hover:from-primary hover:to-secondary hover:bg-slateGray text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          fill="currentColor"
          viewBox="0 0 320 512"
        >
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 
          12.42-50.06 52.24-50.06h40.42V6.26S293.3 0 262.63 
          0c-73.06 0-121.17 44.38-121.17 
          124.72v70.62H86.4V288h55.06v224h89.14V288z" />
        </svg>
      </button>

      {/* Instagram */}
      <button title="Instagram" className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 hover:from-primary hover:to-secondary hover:bg-slateGray text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          fill="currentColor"
          viewBox="0 0 448 512"
        >
          <path d="M224.1 141c-63.6 0-114.9 
          51.3-114.9 114.9s51.3 114.9 
          114.9 114.9 114.9-51.3 
          114.9-114.9S287.7 141 
          224.1 141zm0 189.6c-41.2 0-74.7-33.5-74.7-74.7 
          s33.5-74.7 74.7-74.7 74.7 33.5 
          74.7 74.7-33.5 74.7-74.7 74.7zm146.4-194.3c0 
          14.9-12 26.9-26.9 26.9-14.9 
          0-26.9-12-26.9-26.9s12-26.9 
          26.9-26.9 26.9 12 26.9 
          26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.5S384.3 
          37.7 348.6 36c-35.7-1.7-142.8-1.7-178.5 
          0-35.7 1.7-67.3 9.9-93.5 
          36.2S37.7 127.7 36 163.4c-1.7 
          35.7-1.7 142.8 0 178.5 
          1.7 35.7 9.9 67.3 36.2 
          93.5s57.8 34.5 93.5 
          36.2c35.7 1.7 142.8 1.7 
          178.5 0 35.7-1.7 67.3-9.9 
          93.5-36.2s34.5-57.8 
          36.2-93.5c1.7-35.7 1.7-142.8 
          0-178.5z" />
        </svg>
      </button>

      {/* X / Twitter */}
      <button title="Twitter" className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 hover:from-primary hover:to-secondary hover:bg-slateGray text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          width="50"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M459.37 151.716h.325c.155 2.297.155 
          4.602.155 6.918 0 70.63-53.74 
          152.036-152.036 152.036-30.24 0-58.4-8.86-82.09-24.07 
          4.2.49 8.45.74 12.77.74 25.07 0 
          48.14-8.57 66.44-23.03-23.42-.43-43.16-15.92-49.99-37.18 
          3.26.63 6.61.98 10.05.98 4.85 
          0 9.55-.65 14-1.84-24.52-4.9-42.96-26.6-42.96-52.58 
          v-.67c7.19 4 15.41 6.4 24.13 
          6.67-14.3-9.53-23.72-25.84-23.72-44.34 
          0-9.77 2.62-18.9 7.23-26.72 
          26.36 32.34 65.77 53.54 110.18 55.76-9.1-43.38 
          23.48-78.86 66.88-78.86 
          19.25 0 36.6 8.12 48.75 
          21.13 15.26-2.99 29.57-8.57 
          42.46-16.23-5.01 15.65-15.65 
          28.84-29.51 37.17 13.54-1.61 
          26.44-5.21 38.43-10.52-9.01 
          13.4-20.37 25.17-33.48 34.64z" />
        </svg>
      </button>
    </div>
  );
};

export default SocialSignIn;
