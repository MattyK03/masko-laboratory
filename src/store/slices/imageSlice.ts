import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
	imageUrls: string[];
}

const initialState: ImageState = {
	imageUrls: [],
};

const imageSlice = createSlice({
	name: "images",
	initialState,
	reducers: {
		setFiles(state, action: PayloadAction<string[]>) {
			state.imageUrls = action.payload;
		},
	},
});

export const { setFiles } = imageSlice.actions;
export default imageSlice.reducer;
