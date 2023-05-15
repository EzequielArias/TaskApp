import { AxiosResponse } from "axios";
import { useEffect } from "react";

export const useAsync = (
  AsyncFn: () => Promise<AxiosResponse<any, any>>,
  successFunction: Function,
  returnFunction: Function,
  dependencies: any[] = []
) => {
  useEffect(() => {
    let isActive = true;
    AsyncFn()
    .then((result: any) => {
      if (isActive) successFunction(result.data);
    });

    return () => {
      returnFunction && returnFunction();
      isActive = false;
    };
  }, dependencies);
};
