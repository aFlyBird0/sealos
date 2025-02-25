import React, { useMemo, useRef, useState } from 'react';
import { Box, Flex, Button, useTheme } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useDBStore } from '@/store/db';
import { useToast } from '@/hooks/useToast';
import { useLoading } from '@/hooks/useLoading';
import { useGlobalStore } from '@/store/global';
import { defaultDBDetail } from '@/constants/db';
import { useRouter } from 'next/router';
import Header from './components/Header';
import AppBaseInfo from './components/AppBaseInfo';
import Pods from './components/Pods';
import BackupTable from './components/BackupTable';
import RangeDate from '@/components/RangeDate';

const AppDetail = ({ dbName, listType }: { dbName: string; listType: 'pod' | 'backup' }) => {
  const router = useRouter();
  const listNav = useRef([
    { label: '实例列表', value: 'pod' }
    // { label: '备份列表', value: 'backup' }
  ]);
  const theme = useTheme();
  const { toast } = useToast();
  const { Loading } = useLoading();
  const { screenWidth } = useGlobalStore();
  const isLargeScreen = useMemo(() => screenWidth > 1280, [screenWidth]);
  const { dbDetail = defaultDBDetail, loadDBDetail, dbPods } = useDBStore();
  const [showSlider, setShowSlider] = useState(false);

  useQuery(['loadDBDetail', 'intervalLoadPods'], () => loadDBDetail(dbName), {
    refetchInterval: 3000,
    onError(err) {
      router.replace('/dbs');
      toast({
        title: String(err),
        status: 'error'
      });
    }
  });

  return (
    <Flex flexDirection={'column'} height={'100vh'} bg={'#F3F4F5'} px={9} pb={4}>
      <Box>
        <Header db={dbDetail} setShowSlider={setShowSlider} isLargeScreen={isLargeScreen} />
      </Box>
      <Flex position={'relative'} flex={'1 0 0'} h={0}>
        <Box
          h={'100%'}
          flex={'0 0 400px'}
          mr={4}
          overflowY={'auto'}
          zIndex={1}
          transition={'0.4s'}
          bg={'white'}
          border={theme.borders.sm}
          borderRadius={'md'}
          {...(isLargeScreen
            ? {}
            : {
                w: '400px',
                position: 'absolute',
                left: 0,
                boxShadow: '7px 4px 12px rgba(165, 172, 185, 0.25)',
                transform: `translateX(${showSlider ? '0' : '-800px'})`
              })}
        >
          {dbDetail ? <AppBaseInfo db={dbDetail} /> : <Loading loading={true} fixed={false} />}
        </Box>
        <Flex
          flexDirection={'column'}
          flex={'1 0 0'}
          w={0}
          h={'100%'}
          bg={'white'}
          border={theme.borders.sm}
          borderRadius={'md'}
        >
          <Flex p={'26px'} alignItems={'flex-start'}>
            {listNav.current.map((item) => (
              <Box
                key={item.value}
                mr={5}
                pb={2}
                borderBottom={'2px solid'}
                cursor={'pointer'}
                fontSize={'lg'}
                {...(item.value === listType
                  ? {
                      color: 'black',
                      borderBottomColor: 'black'
                    }
                  : {
                      color: 'myGray.500',
                      borderBottomColor: 'transparent',
                      onClick: () =>
                        router.replace(`/db/detail?name=${dbName}&listType=${item.value}`)
                    })}
              >
                {item.label}
              </Box>
            ))}
            <Box flex={1}></Box>
            {listType === 'pod' && <Box color={'myGray.500'}>{dbPods.length} Items</Box>}
            {listType === 'backup' && (
              <Flex alignItems={'center'}>
                <RangeDate />
                <Button ml={3}>确认</Button>
              </Flex>
            )}
          </Flex>
          <Box flex={'1 0 0'} h={0}>
            {listType === 'pod' && <Pods dbName={dbName} dbType={dbDetail.dbType} />}
            {/* {listType === 'backup' && <BackupTable dbName={dbName} />} */}
          </Box>
        </Flex>
      </Flex>
      {/* mask */}
      {!isLargeScreen && showSlider && (
        <Box
          position={'fixed'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          onClick={() => setShowSlider(false)}
        />
      )}
    </Flex>
  );
};

export default AppDetail;

export async function getServerSideProps(context: any) {
  const dbName = context.query?.name || '';
  const listType = context.query?.listType || 'pod';

  return {
    props: { dbName, listType }
  };
}
