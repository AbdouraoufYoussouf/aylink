import { BlocType, SousBlocType } from "@/src/types/bloc-type";
import { SubBlocType } from "@prisma/client";

export function formatSubBloc(subBloc: any): SousBlocType {
    const baseSubBloc = {
        id: subBloc.id,
        blocId: subBloc.blocId,
        title: subBloc.title,
        description: subBloc.description,
        isPrivate: subBloc.isPrivate,
        isDisplay: subBloc.isDisplay,
        isPaid: subBloc.isPaid,
        price: subBloc.price || undefined,
    };

    switch (subBloc.type) {
        case SubBlocType.URL:
            return {
                ...baseSubBloc,
                type: SubBlocType.URL,
                url: subBloc.url,
                imageUrl: subBloc.imageUrl,
                altText: subBloc.altText,
            } as SousBlocType;
        case SubBlocType.IMAGE:
            return {
                ...baseSubBloc,
                type: SubBlocType.IMAGE,
                imageUrl: subBloc.imageUrl,
                altText: subBloc.altText,
            } as SousBlocType;
        case SubBlocType.DOCUMENT:
            return {
                ...baseSubBloc,
                type: SubBlocType.DOCUMENT,
                documentUrl: subBloc.documentUrl,
                fileType: subBloc.fileType,
                fileSize: subBloc.fileSize,
            } as SousBlocType;
        case SubBlocType.VIDEO:
            return {
                ...baseSubBloc,
                type: SubBlocType.VIDEO,
                videoUrl: subBloc.videoUrl,
                thumbnailUrl: subBloc.thumbnailUrl,
                duration: subBloc.duration,
                embedCode: subBloc.embedCode,
                actionType: subBloc.actionType as "URL" | "FORM",
                actionUrl: subBloc.actionUrl,
                actionFormId: subBloc.actionFormId,
            } as SousBlocType;
        default:
            throw new Error(`Unknown SubBloc type: ${subBloc.type}`);
    }
}

export function formatBloc(bloc: any): BlocType {
    return {
        id: bloc.id,
        isDisplay: bloc.isDisplay,
        name: bloc.name,
        subBlocs: bloc.subBlocs.map(formatSubBloc),
    };
}

export function formatBlocs(blocs: any[]): BlocType[] {
    return blocs.map(formatBloc);
}