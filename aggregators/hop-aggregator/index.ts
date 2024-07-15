import { CHAIN } from "../../helpers/chains";
import { httpPost } from "../../utils/fetchURL";
import { FetchOptions } from "../../adapters/types";
import { getTimestampAtStartOfDayUTC } from "../../utils/date"

const fetchVolume = async (_t: any, _b: any ,options: FetchOptions) => {
  const timestamp = getTimestampAtStartOfDayUTC(options.startOfDay) * 1_000;

  const res = await httpPost("https://d3axhvc6i89jmo.cloudfront.net/api/volume", { timestamp });
  const record = res.record || {};

  return {
    dailyVolume: record.total_volume_usd ? record.total_volume_usd.toFixed(2) : 0,
    totalVolume: res.total_volume_usd ? res.total_volume_usd.toFixed(2) : 0,
    timestamp: timestamp,
  };
};

const adapter: any = {
  adapter: {
    [CHAIN.SUI]: {
      fetch: fetchVolume,
      start: 1714276800
    },
  },
};

export default adapter;
