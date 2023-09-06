export interface GraphData {
    labels: string[];
    datasets: {
        label: string,
        backgroundColor: string,
        data: any[],
    }[],
}

export interface GraphDataIterator {
    [key: string]: {
      labels: string[];
      datasets: {
        label: string;
        backgroundColor: string;
        data: number[];
      }[];
    };
  }