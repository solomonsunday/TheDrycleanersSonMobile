/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from '@components/header';
import {Paragraph} from '@components/text/text';
import {
  BaseView,
  BottomViewContainer,
  Center,
  FlexedView,
  Spacer,
  ViewContainer,
} from '@components/view';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import basket from '@assets/img/basketbig.png';
import {clothes} from '../../data';
import {ClotheItem} from '@screens/pricelist/components/ClotheItem';
import {AppButton} from '@components/button';
import {NAIRA} from '@utility/naira';
import colors from '@utility/colors';
import {heightPixel} from '@utility/pxToDpConvert';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'src/types';
import {HomeScreenParam} from 'src/navigators/dashboard/screens';
import {useDispatch, useSelector} from 'react-redux';
import {basketSelector, removeFromBasket} from '@store/basket';

export const Basket = () => {
  const {navigate} = useNavigation<nav<HomeScreenParam>>();
  const items = useSelector(basketSelector);
  const [data, setData] = useState([...clothes]);
  const dispatch = useDispatch();

  console.log(items, 'the basket items');

  const removeItem = (id: string) => {
    dispatch(removeFromBasket(id));
  };

  return (
    <BaseView>
      <Header hasRightItems={false} hasBorder={false} title="Laundry basket" />
      <ViewContainer style={styles.container}>
        {!items?.length ? (
          <Center>
            <Image source={basket} />
            <Spacer />
            <Paragraph fontSize={16} lineHeight={20} textAlign="center">
              There are no items in your laundry basket...
            </Paragraph>
          </Center>
        ) : (
          <View style={{flex: 1}}>
            <ScrollView>
              <Spacer height={20} />
              {items?.map(dt => (
                <ClotheItem
                  key={dt.id}
                  item={dt}
                  type="basket"
                  onDelete={() => removeItem(dt.id)}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ViewContainer>
      {items?.length ? (
        <BottomViewContainer style={{height: heightPixel(170)}}>
          <FlexedView style={styles.totalView} justifyContent="space-between">
            <Paragraph fontSize={16} lineHeight={21}>
              Total:{' '}
            </Paragraph>
            <Paragraph
              fontSize={16}
              lineHeight={21}>{`${NAIRA}200,00`}</Paragraph>
          </FlexedView>
          <FlexedView justifyContent="space-around">
            <AppButton
              style={{width: '45%'}}
              variant="secondary"
              text="Add more items"
              onPress={() => navigate('Pricelist')}
            />
            <AppButton
              style={{width: '45%'}}
              variant="primary"
              text="Proceed"
              onPress={() => navigate('Checkout')}
            />
          </FlexedView>
        </BottomViewContainer>
      ) : null}
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalView: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: heightPixel(50),
  },
});
