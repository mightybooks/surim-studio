module.exports = {
  async redirects() {
    return [
      // 스토어별 목적지. 필요 시 UTM 파라미터 추가
      { source: "/go/yes24", destination: "https://www.yes24.com/...", permanent: false },
      { source: "/go/aladin", destination: "https://www.aladin.co.kr/...", permanent: false },
      { source: "/go/kyobo", destination: "https://product.kyobobook.co.kr/...", permanent: false },
      { source: "/go/ridibooks", destination: "https://ridibooks.com/...", permanent: false },
      { source: "/go/kdp", destination: "https://www.amazon.com/dp/...", permanent: false },
    ];
  },
};
