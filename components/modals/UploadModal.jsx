"use client"
import useUploadModal from '@/hooks/useUploadModal'
import Modal from './Modal'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import uniqid from "uniqid";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const UploadModal = () => {

    const {isOpen, onClose} = useUploadModal();

    const [isLoading, setIsLoading] = useState(false);
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        defaultValues : {
            author : '',
            title : '',
            color : '',
            song : null,
            image : null
        }
    });

    const onChange = (open) => {
        if(!open){
            reset();
            onClose();
        }
    }

    const onSubmit = async(values) => {
        try {
            setIsLoading(true);
            const imageFile = values?.image?.[0];
            const songFile = values?.song?.[0];

            if(!imageFile || !songFile || !user){
                setIsLoading(false);
                toast.error("Missing Fields");
                return;
            }

            const uniqueId = uniqid();

            // Upload Song

            const {
                data : songData,
                error : songError
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueId}`, songFile, {
                    cacheControl : '3600',
                    upsert : false
                });

            if(songError){
                setIsLoading(false);
                return toast.error("Failed to upload song")
            }

            // Upload Image

            const {
                data : imageData,
                error : imageError
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueId}`, imageFile, {
                    cacheControl : '3600',
                    upsert : false
                });

            if(imageError){
                setIsLoading(false);
                return toast.error("Failed to upload image")
            }

            const {error : supabaseError} =  await supabaseClient.from('songs').insert({
                user_id : user.id,
                title : values.title,
                author : values.author,
                color : values.color,
                image_path : imageData.path,
                song_path : songData.path
            });

            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }
            router.refresh();
            toast.success("Song created successfully");
            reset();
            onClose();
        } catch (error) {
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
        console.log(values);
    }

    return (
        <Modal
            title="Upload Your Music"
            description="Share your music with the world! Upload your MP3 files and let your music be heard."
            isOpen = {isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-y-4'
            >
                <Input
                    id = "title"
                    disabled = {isLoading}
                    {...register('title', {required : true})}
                    placeholder = "Song title"
                />
                <Input
                    id = "author"
                    disabled = {isLoading}
                    {...register('author', {required : true})}
                    placeholder = "Singer name"
                />
                <div
                    className='flex justify-between items-center'
                >
                    <p className='text-sm font-light text-neutral-400'>Choose Background Color</p>
                    <input
                        id = "color"
                        disabled = {isLoading}
                        {...register('color', {required : true})}
                        type = "color"
                        className = ""
                    />
                </div>
                <div>
                    <div className='pb-1'>
                        Select a song file
                    </div>
                    <Input
                        id = "song"
                        disabled = {isLoading}
                        {...register('song', {required : true})}
                        type = "file"
                        accept = ".mp3"
                    />
                </div>
                <div>
                    <div className='pb-1'>
                        Select an image
                    </div>
                    <Input
                        id = "image"
                        disabled = {isLoading}
                        {...register('image', {required : true})}
                        type = "file"
                        accept = "image/*"
                    />
                </div>
                <Button
                    disabled = {isLoading}
                    type  = "submit"
                    className = "bg-white py-2 font-bold"
                >
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default UploadModal;