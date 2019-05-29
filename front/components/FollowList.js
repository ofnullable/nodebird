import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card, Icon } from 'antd';

const FollowList = memo(({ header, hasMore, loadMore, data, remove }) => {
  return (
    <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      header={<div>{header}</div>}
      loadMore={
        hasMore && (
          <Button style={{ width: '100%' }} onClick={loadMore}>
            더보기
          </Button>
        )
      }
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ marginTop: '20px' }} key={`${item.id}`}>
          <Card
            actions={[
              <Icon key='stop' type='stop' onClick={remove(item.id)} />,
            ]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
});

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
};

export default FollowList;
