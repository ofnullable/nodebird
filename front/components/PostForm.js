import React, { useRef, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

const PostForm = () => {

    const { imagePaths } = useSelector(state => state.post);
    const fileInput = useRef();

    const buttonClick = useCallback((e) => {
        e.preventDefault();
        fileInput.current.click();
    }, []);

    return (
        <Form style={{ marginBottom: '20px' }} encType="multipart/form-data">
            <Input.TextArea maxLength={140} placeholder="" />
            <div>
                <input type="file" ref={fileInput} multiple hidden />
                <Button onClick={buttonClick}>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map(v => {
                    return (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={`http://localhost:3065/${v}`} style={{ width: '280px' }} alt={v} />
                            <div>
                            </div>
                            <Button>제거</Button>
                        </div>
                    );
                })}
            </div>
        </Form>
    );
}

export default PostForm;