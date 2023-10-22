const mobileList = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
];

const canUseDOM = () => {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
};

const useAdaptiveLoading = () => {
  const props = {
    networkType: "4g",
    deviceMemory: 0,
    processorCore: 0,
    downlink: 0,
    isMobile: false,
  };

  if (!canUseDOM || !navigator) {
    return props;
  }

  const getNetworkType = async () => {
    // ios and firefox currently not supported (default to 4g)
    // contains either slow-2g (50kbps), 2g (70kbps), 3g (700kbps), 4g (>700kbps)
    if (!navigator.connection || !navigator.connection.effectiveType) {
      return;
    }

    props.networkType = navigator.connection.effectiveType;
  };

  const getDownlink = async () => {
    if (!navigator.connection || !navigator.connection.downlink) {
      return;
    }

    props.downlink = navigator.connection.downlink;
  };

  const getDeviceMemory = async () => {
    if (!navigator.deviceMemory) {
      return;
    }

    props.deviceMemory = navigator.deviceMemory;
  };

  const getProcessorCore = async () => {
    if (!navigator.hardwareConcurrency) {
      return;
    }

    props.processorCore = navigator.hardwareConcurrency;
  };

  const checkIsMobile = async () => {
    if (!navigator.userAgent) {
      return;
    }

    props.isMobile = mobileList.some((value) => {
      return navigator.userAgent.match(value);
    });
  };

  getNetworkType();
  getDownlink();
  getDeviceMemory();
  getProcessorCore();
  checkIsMobile();

  return props;
};

export default useAdaptiveLoading;
