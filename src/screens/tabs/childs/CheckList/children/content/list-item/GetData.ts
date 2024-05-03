import axios from 'axios'
import { useDispatch } from 'react-redux';
import { updateTodayMission, updateNotDoneMission, updateDoneMission } from '../../../../../../../../slices/mission/missionSlice';

export type ListItemType = {
  title: string;
  uri: string;
};

let todayData: ListItemType[] = [
  
  {
    title: "Công việc hôm nay",
    uri: "today",
  },
];

let otherData: ListItemType[] = [
  {
    title: "Công việc khác chưa hoàn thành",
    uri: "other",
  },
];

let completedTodayData: ListItemType[] = [
  {
    title: "Công việc đã hoàn thành",
    uri: "Subtitle for completed",
  },
];

const fetchData = async (item: ListItemType) => {
  try {
    const response = await axios.get(`https://65a7b8eb94c2c5762da763fe.mockapi.io/today`);
    if (response.data) {
      // const updatedItem = { ...item, details: response.data[0].details };
      return response.data
    }
    // item.details = data.details;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getData = () => {
  const data: ListItemType[] = [
    ...todayData,
    ...otherData,
    ...completedTodayData,
  ];
  return data;
};

// Move the fetchDetailsOnExpand function into a separate file, e.g., missionService.ts


export const fetchDetailsOnExpand = async (item, dispatch) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://65a7b8eb94c2c5762da763fe.mockapi.io/today`);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const details = await fetchData();
  if (details !== null) {
    switch (item.uri) {
      case 'today':
        dispatch(updateTodayMission(details));
        break;
      case 'other':
        dispatch(updateNotDoneMission(details));
        break;
      case 'Subtitle for completed':
        dispatch(updateDoneMission(details));
        break;
      default:
        break;
    }
  }
};
