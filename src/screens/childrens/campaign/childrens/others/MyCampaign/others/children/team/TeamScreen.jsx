// LocationScreen.js

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,StatusBar,Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import animatedPerson from '../../../../../../../../assets/running-man-unscreen.gif';
import animatedSuccess from '../../../../../../../../assets/success.gif';
import askingIcon from '../../../../../../../../assets/question.png';

import {
  addAddTeams,
  updateAddTeams,
  deleteAddTeams,
  resetAddTeams,
  replaceAddTeams,
} from '../../../../../../../../../../slices/add-campaign/teams/AddTeamSlice';

const widthDimensions = Dimensions.get('screen').width;
const heightDimensions = Dimensions.get('screen').height;

const TeamScreen = () => {
  const dispatch = useDispatch();
  const [dataParsing, setDataParsing] = useState(null);
  const [selectedItem,setSelectedItem] = useState(null);
  const ticketData = useSelector(state => state.addTeam);
  const [errorData,setErrorData] = useState(false);
  const handleDontCare = () => {
    setSelectedItem(null);
    setModalVisible(false);
  }
  const addLocationHandler = () => {
    const outputObject = {};
    Object.keys(ticketData).forEach(key => {
      const index = parseInt(key, 10);
      outputObject[index] = ticketData[key];
    });
    return outputObject;
  };

  useEffect(() => {
    const dataParsing = addLocationHandler();
    setDataParsing(dataParsing);
  }, []);

  const handleNameChange = (index, value) => {
    // Tạo bản sao của dataParsing
    const newDataParsing = {...dataParsing};

    // Cập nhật giá trị mới vào bản sao
    if (newDataParsing[index]) {
      newDataParsing[index] = {
        ...newDataParsing[index],
        name: value,
      };
    }

    // Cập nhật state
    setDataParsing(newDataParsing);

    // Gửi action đến Redux
    dispatch(updateAddTeams({index, name: value}));
  };
  const [loading,setLoading] = useState(false)
  const handlePriceChange = (index, value) => {
    dispatch(updateAddTeams({index, price: value}));
    const newDataParsing = {...dataParsing};

    // Cập nhật giá trị mới vào bản sao
    if (newDataParsing[index]) {
      newDataParsing[index] = {
        ...newDataParsing[index],
        price: value,
      };
    }

    // Cập nhật state
    setDataParsing(newDataParsing);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [inputModal, setInputModal] = useState('');
  const [successAction, setSuccessAction] = useState(false);

  const addLocation = () => {
    const newInput = {name: '', price: ''};

    const index = Object.keys(dataParsing).length + 1;
    dispatch(addAddTeams({index, name: '', price: ''}));
    const newDataParsing = {...dataParsing};
    newDataParsing[index] = newInput;

    // Cập nhật state
    setDataParsing(newDataParsing);
  };

  return (
    <><View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginVertical: 0.06 * Dimensions.get('screen').height,
        }}>
        {dataParsing &&
          Object.keys(dataParsing).map(index => (
            <View
              key={index}
              style={{
                paddingHorizontal: 15,
                paddingTop: 15,
              }}>
              <Text
                style={{
                  color: 'rgb(59, 55, 142)',
                  fontSize: 13,
                  fontWeight: '700',
                }}>
                Đội nhóm {index}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Chưa có dữ liệu"
                value={dataParsing[index]?.name}
                // onChangeText={value => handleNameChange(index, value)}
                placeholderTextColor="rgb(59, 55, 142)"
                editable={false} selectTextOnFocus={false} 
              />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                }}
                onPress={() => {
                  setSelectedItem(index)
                  setModalVisible(true)
                }}>
                <Ionicons
                  name="pencil"
                  size={15}
                  color="rgb(59, 55, 142)"
                />
                <Text
                  style={{
                    color: 'rgb(59, 55, 142)',
                    fontSize: 13,
                    fontWeight: '500',
                    marginLeft: 10,
                  }}>
                  {dataParsing[index]?.name === '' ? 'Thêm' : 'Sửa'} đội nhóm
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        <TouchableOpacity
          style={{
            marginTop: 30,
            paddingHorizontal: 15,
            flexDirection: 'row',
          }}
          onPress={addLocation}>
          <Ionicons name="add-outline" size={20} color="rgb(59, 55, 142)" />
          <Text
            style={{
              color: 'rgb(59, 55, 142)',
              fontSize: 13,
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Tạo đội nhóm
          </Text>
        </TouchableOpacity>
      </ScrollView>
      
    </View>
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={askingIcon} style={styles.modalIcon} alt=""/>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20,
                textAlign: 'center',
              }}>
              Hãy nhập thông tin đội nhóm 
            </Text>
           
            <TextInput
              style={[
                styles.inputModal,
                {borderColor: errorData ? 'red' : 'black'},
              ]}
              placeholderTextColor="gray"
              placeholder="Nhập thông tin đội nhóm"
              onChangeText={text => {
                setInputModal(text);
                setErrorData(false);
              }}
            />
            {errorData && (
              <Text style={styles.errorText}>
                Không tìm thấy đại lý, hãy thử lại
              </Text>
            )}

            <View style={styles.buttonModalContainer}>
              <TouchableOpacity
                style={{
                  width: '40%',
                  paddingVertical: 15,
                  backgroundColor: 'gray',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => handleDontCare()}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                  Hủy
                </Text>
              </TouchableOpacity>

              {inputModal.length < 10 ? (
                <View
                  style={{
                    width: '55%',
                    paddingVertical: 15,
                    backgroundColor: 'gray',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                    Đồng ý
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    width: '55%',
                    paddingVertical: 15,
                    backgroundColor: 'rgb(255, 158, 185)',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handleAccept()}>
                  {loading ? (
                    <FastImage
                      style={{width: 20, height: 20}}
                      source={animatedPerson}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  ) : successAction ? (
                    <FastImage
                      style={{width: 20, height: 20}}
                      source={animatedSuccess}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Đồng ý
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal></>
  );
};

const styles = StyleSheet.create({
  modalIcon: {
    height: 100,
    width: 100,
  },
  buttonModalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    
    height: 40,
    fontSize: 13,
    marginTop: 5,
    color: 'black',
  },
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: widthDimensions * 0.9,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },inputModal: {
    height: 40,
    marginVertical: 20,
    borderWidth: 0.5,
    width: '100%',
    color: 'black',
    paddingHorizontal: 10,
    borderColor: 'black',
    borderRadius: 5,
  },
});

export default TeamScreen;
