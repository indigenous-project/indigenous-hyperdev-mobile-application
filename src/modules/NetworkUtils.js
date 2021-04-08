import NetInfo from '@react-native-community/netinfo';
export default async function isNetworkAvailable() {
  const response = await NetInfo.fetch();
  return response.isConnected;
}
