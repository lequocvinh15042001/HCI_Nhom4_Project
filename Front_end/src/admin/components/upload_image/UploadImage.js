import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faImage } from '@fortawesome/free-solid-svg-icons';

import { Title } from '~/components';
import { productServices } from '~/services';
import { uploadImage } from '~/assets/images';
import { ButtonCustomize } from '~/admin/components';
// import logger from '~/utils/logger';

import { cx, context } from './constant';

function UploadImage({ id, onChange, value = [], isMultiple, colBase }) {
    // Hooks
    // - useState
    const [dragover, setDragOver] = useState(false);
    const [files, setFiles] = useState(value);
    const [filesAddition, setFilesAddition] = useState([]);
    // - useEffect
    useEffect(() => {
        return () =>
            filesAddition.forEach((item) => {
                URL.revokeObjectURL(item.preview);
            });
    }, [filesAddition]);

    // Handle event
    const handleDragEnter = () => setDragOver(true);
    const handleDragLeave = () => setDragOver(false);
    const handleDrop = () => setDragOver(false);
    const handleOnChange = ({ target: { files } }) => {
        const multipleFile = [...files];

        multipleFile.map((item) => (item.preview = URL.createObjectURL(item)));

        setFilesAddition(multipleFile);

        if (onChange) {
            onChange(multipleFile);
        }
    };
    const handleAddImages = (event) => {
        event.preventDefault();
        const formData = new FormData();

        filesAddition.forEach((item) => {
            if (item.preview) {
                formData.append('url', item);
            }
        });

        Swal.fire({
            title: 'Thêm ảnh',
            didOpen: async () => {
                Swal.showLoading();
                const result = await productServices.addImagesProduct({
                    id,
                    data: formData,
                });
                const expectMessage = 'Add image to product successfully';

                if (result?.message === expectMessage) {
                    toast.success('Thêm ảnh thành công');
                    setFiles(result.data);
                    setFilesAddition([]);
                } else {
                    toast.error('Thêm ảnh thất bại');
                }

                Swal.close();
            },
        });
    };
    const handleDeleteImage = ({ id_image }) => {
        Swal.fire({
            title: 'Xóa ảnh',
            didOpen: async () => {
                Swal.showLoading();
                const result = await productServices.deleteImageProduct({
                    id,
                    idImage: id_image,
                });
                const expectMessage = 'Delete image successfully';

                if (result?.message === expectMessage) {
                    toast.success('Xóa ảnh thành công');
                    setFiles((previous) => {
                        const newFiles = previous.filter(
                            (item) => item.id_image !== result.data,
                        );

                        return newFiles;
                    });
                } else {
                    toast.error('Xóa ảnh thất bại');
                }

                Swal.close();
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('dropzone', {
                    'dropzone--dragover': dragover,
                    'dropzone--single': !isMultiple,
                })}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <img
                    src={uploadImage}
                    alt='upload'
                    className={cx('upload-img')}
                />
                <input
                    type='file'
                    title=''
                    multiple={isMultiple}
                    className={cx('input-img')}
                    onChange={handleOnChange}
                />
                <span className={cx('topic')}>{context.dragNDrop}</span>
            </div>

            <div
                className={cx('images-preview', {
                    'images-preview--empty': !files.length,
                    'images-preview--single': !isMultiple,
                })}
            >
                {!!files.length && <Title as='h2'>Ảnh cũ</Title>}
                <ul className={cx('row')}>
                    {!!files.length &&
                        files.map((item, index) => (
                            <li
                                key={index}
                                className={cx('image-preview', 'col', colBase)}
                            >
                                <div
                                    className={cx('wrapper-image', {
                                        'wrapper-image--single': !isMultiple,
                                    })}
                                >
                                    <img
                                        className={cx('image')}
                                        src={item?.url || item}
                                        alt={item?.name || `response-${index}`}
                                    />
                                </div>
                                {isMultiple && (
                                    <ButtonCustomize
                                        isDelete={true}
                                        fullWidth
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleDeleteImage(item);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </ButtonCustomize>
                                )}
                            </li>
                        ))}
                </ul>
            </div>

            <div
                className={cx('images-preview', {
                    'images-preview--empty': !filesAddition.length,
                    'images-preview--single': !isMultiple,
                })}
            >
                {!!filesAddition.length && <Title as='h2'>Ảnh mới</Title>}
                <ul className={cx('row')}>
                    {filesAddition.map((item, index) => (
                        <li
                            key={index}
                            className={cx('image-preview', 'col', colBase)}
                        >
                            <div
                                className={cx('wrapper-image', {
                                    'wrapper-image--single': !isMultiple,
                                })}
                            >
                                <img
                                    className={cx('image')}
                                    src={item.preview}
                                    alt={`upload-${index}`}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {id && (
                <div
                    style={{
                        width: '80rem',
                        margin: '0 auto',
                        padding: '0 1rem',
                    }}
                >
                    {!!filesAddition.length && (
                        <ButtonCustomize
                            isEdit={true}
                            fullWidth
                            onClick={handleAddImages}
                        >
                            <FontAwesomeIcon icon={faImage} />
                        </ButtonCustomize>
                    )}
                </div>
            )}
        </div>
    );
}

export default UploadImage;
