import axios from "axios";

export interface RankType {
  _id: string;
  rank: RankInitType[];
}

export interface RankInitType {
  name: string;
  playtime: number;
  score: number;
  createdAt: string;
}

export interface ResponseType {
  rank: RankType[];
}

export const fetchRank = async (type: string, difficulty: string) => {
  try {
    const response = await axios.get<ResponseType>("http://localhost:4500/rank/ranking", {
      params: {
        type: type,
        difficulty: difficulty,
      },
    });

    return response.data.rank[0];
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const addNewRank = async (type: string, difficulty: string, data: RankInitType) => {
  try {
    await axios.post("http://localhost:4500/rank/insert", {
      type,
      difficulty,
      data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateRank = async (
  type: string,
  difficulty: string,
  id: string,
  data: RankInitType[],
) => {
  try {
    await axios.put("http://localhost:4500/rank/update", {
      id,
      type,
      difficulty,
      data,
    });
  } catch (error) {
    console.error(error);
  }
};
