import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Video = () => {

    const [video, setVideo] = useState('')
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')

    const { generateVideo } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (input) {
            const videoUrl = await generateVideo(input)

            if (videoUrl) {
                setVideo(videoUrl)
                setIsVideoLoaded(true)
            }
        }

        setLoading(false)
    }

    return (
        <motion.form
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmitHandler}
            className="flex flex-col min-h-[90vh] justify-center items-center"
        >

            {/* Video Preview */}
            <div className="flex flex-col items-center w-full px-4">

                {video ? (
                    <video
                        src={video}
                        controls
                        playsInline
                        className={`w-full max-w-2xl aspect-video object-cover rounded-xl shadow-lg ${loading ? 'opacity-70' : 'opacity-100'} transition`}
                    />
                ) : (
                    <img
                        src={assets.sample_img_1}
                        className="w-full max-w-2xl aspect-video object-cover rounded-xl shadow-lg"
                        alt=""
                    />
                )}

                {/* Loading UI */}
                {loading && (
                    <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-2xl">

                        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                            <motion.div
                                className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                        </div>

                        <motion.p
                            className="text-sm font-medium text-gray-700"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            🎥 Creating your AI video...
                        </motion.p>

                    </div>
                )}

            </div>

            {/* Input Section */}
            {!isVideoLoaded && (
                <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">

                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder="Describe the video you want to generate"
                        className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-white"
                    />

                    <button
                        type="submit"
                        className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate Video"}
                    </button>

                </div>
            )}

            {/* Action Buttons */}
            {isVideoLoaded && (
                <div className="flex gap-3 flex-wrap justify-center text-sm mt-10">

                    <p
                        onClick={() => {
                            setIsVideoLoaded(false)
                            setVideo('')
                        }}
                        className="border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-100"
                    >
                        Generate Another
                    </p>

                    <a
                        href={video}
                        download
                        className="bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer"
                    >
                        Download
                    </a>

                </div>
            )}

        </motion.form>
    )
}

export default Video