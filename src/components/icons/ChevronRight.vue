<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        id="Group_18233"
        data-name="Group 18233"
        transform="translate(16682 10986)"
      >
        <g
          id="Group_18227"
          data-name="Group 18227"
          transform="translate(-17207.086 -9882.086) rotate(-90)"
        >
          <g
            id="Group_9351"
            data-name="Group 9351"
            transform="translate(2184 1075) rotate(180)"
          >
            <path
              id="Path_13100"
              data-name="Path 13100"
              d="M1099,542.414l-7-7-7,7L1083.586,541l8.414-8.414,8.414,8.414Z"
              :fill="svgColor"
            />
          </g>
        </g>
        <rect
          id="Rectangle_12456"
          data-name="Rectangle 12456"
          width="24"
          height="24"
          transform="translate(-16682 -10986)"
          fill="none"
        />
      </g>
    </svg>
  </div>
</template>
    
<script>
export default {
    name: "ChevronRight",
    props:   {  
    svgColor: {
        type: String,
        default: "",
    },
    }
};
</script>
    