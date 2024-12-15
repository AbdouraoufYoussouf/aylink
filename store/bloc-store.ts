import { BlocType, SousBlocType } from "@/src/types/bloc-type";
import { create } from "zustand";

interface BlocState {
    blocs: BlocType[];
    addBloc: (bloc: BlocType) => void;
    removeBloc: (blocId: string) => void;
    setBlocs: (blocs: BlocType[]) => void;
    updateBloc: (blocId: string, newBloc: Partial<BlocType>) => void;
    toggleDisplayBloc: (blocId: string) => void;

    addSubBloc: (blocId: string, subBloc: SousBlocType) => void;
    removeSubBloc: (blocId: string, subBlocId: string) => void;
    updateSubBloc: (blocId: string, subBlocId: string, newSubBloc: Partial<SousBlocType>) => void;
    toggleDisplaySubBloc: (blocId: string, subBlocId: string) => void;
    togglePrivateSubBloc: (blocId: string, subBlocId: string) => void;
    togglePaidSubBloc: (blocId: string, subBlocId: string) => void;
}

export const useBlocStore = create<BlocState>((set) => ({
    blocs: [],

    addBloc: (bloc) => set((state) => ({
        blocs: [bloc, ...state.blocs],
    })),

    removeBloc: (blocId) => set((state) => ({
        blocs: state.blocs.filter((bloc) => bloc.id !== blocId),
    })),

    setBlocs: (blocs) => set(() => ({
        blocs,
    })),

    updateBloc: (blocId, newBloc) => set((state) => ({
        blocs: state.blocs.map((bloc) =>
            bloc.id === blocId ? { ...bloc, ...newBloc } : bloc
        ),
    })),

    toggleDisplayBloc: (blocId) => set((state) => ({
        blocs: state.blocs.map((bloc) =>
            bloc.id === blocId ? { ...bloc, isDisplay: !bloc.isDisplay } : bloc
        ),
    })),



    addSubBloc: (blocId, subBloc) => set((state) => ({
        blocs: state.blocs.map((bloc) =>
            bloc.id === blocId
                ? { ...bloc, subBlocs: [...(bloc.subBlocs || []), subBloc] }
                : bloc
        ),
    })),

    removeSubBloc: (blocId, subBlocId) => set((state) => ({
        blocs: state.blocs.map((bloc) =>
            bloc.id === blocId
                ? {
                    ...bloc,
                    subBlocs: bloc.subBlocs?.filter((subBloc) => subBloc.id !== subBlocId) || [],
                }
                : bloc
        ),
    })),

    updateSubBloc: (blocId: string, subBlocId: string, newSubBloc: Partial<SousBlocType>) => set((state) => ({
        blocs: state.blocs.map((bloc) =>
            bloc.id === blocId
                ? {
                    ...bloc,
                    subBlocs: bloc.subBlocs?.map((subBloc) =>
                        subBloc.id === subBlocId
                            ? {
                                ...subBloc,
                                ...newSubBloc,
                                type: newSubBloc.type || subBloc.type
                            } as SousBlocType
                            : subBloc
                    ) || []
                }
                : bloc
        )
    })),

    toggleDisplaySubBloc: (blocId, subBlocId) => set((state) => ({
        blocs: state.blocs.map((bloc) =>
            bloc.id === blocId
                ? {
                    ...bloc,
                    subBlocs: bloc.subBlocs?.map((subBloc) =>
                        subBloc.id === subBlocId
                            ? { ...subBloc, isDisplay: !subBloc.isDisplay }
                            : subBloc
                    ) || [],
                }
                : bloc
        ),
    })),

    togglePrivateSubBloc: (blocId, subBlocId) => set((state) => ({
        blocs: state.blocs.map((bloc) =>
            bloc.id === blocId
                ? {
                    ...bloc,
                    subBlocs: bloc.subBlocs?.map((subBloc) =>
                        subBloc.id === subBlocId
                            ? { ...subBloc, isPrivate: !subBloc.isPrivate }
                            : subBloc
                    ) || [],
                }
                : bloc
        ),
    })),

    togglePaidSubBloc: (blocId, subBlocId) => set((state) => ({
        blocs: state.blocs.map((bloc) =>
            bloc.id === blocId
                ? {
                    ...bloc,
                    subBlocs: bloc.subBlocs?.map((subBloc) =>
                        subBloc.id === subBlocId
                            ? { ...subBloc, isPaid: !subBloc.isPaid }
                            : subBloc
                    ) || [],
                }
                : bloc
        ),
    })),
}));